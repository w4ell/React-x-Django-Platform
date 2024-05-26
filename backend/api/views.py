from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import UserProfileUpdateSerializer, UserSerializer
from .models import UserAccount
from .permissions import IsAdminCheck
from io import BytesIO
import pandas as pd
import base64
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
from django.db.models.functions import TruncDay
from django.db.models import Count
import seaborn as sns
import os 
import sqlite3
import psycopg2
import mysql.connector
from datetime import timedelta
from django.utils import timezone 
from sqlalchemy import create_engine


class UserProfileUpdateView(APIView):
    def put(self, request):
        serializer = UserProfileUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DashboardStats(APIView):
    permission_classes = [IsAdminCheck]

    def get(self, request, format=None):
        user_count = UserAccount.objects.count()
        new_signups = UserAccount.objects.filter(created_at__gte=timezone.now() - timedelta(days=30)).count()
        admin_count = UserAccount.objects.filter(is_admin=True).count()

        # New users per day for the last 7 days
        end_date = timezone.now()
        start_date = end_date - timedelta(days=6)
        new_users_per_day = self.get_new_users_per_day(start_date, end_date)

        data = {
            'user_count': user_count,
            'new_signups': new_signups,
            'admin_count': admin_count,
            'new_users_per_day': new_users_per_day,
        }
        return Response(data)

    def get_new_users_per_day(self, start_date, end_date):
        new_users_per_day = UserAccount.objects.filter(created_at__range=[start_date, end_date]) \
            .annotate(day=TruncDay('created_at')) \
            .values('day') \
            .annotate(count=Count('id')) \
            .order_by('day')

        # Create a dictionary with dates as keys and counts as values
        new_users_data = {entry['day'].date(): entry['count'] for entry in new_users_per_day}

        # Fill in missing dates with zero counts for the last 7 days
        current_date = start_date
        while current_date <= end_date:
            if current_date.date() not in new_users_data:
                new_users_data[current_date.date()] = 0
            current_date += timedelta(days=1)

        # Sort the dictionary by date and format as list of dicts
        new_users_data = sorted(new_users_data.items())
        new_users_data = [{'day': date, 'count': count} for date, count in new_users_data]

        return new_users_data
class UserListView(generics.ListAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminCheck]

class AdminUserDetail(generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminCheck]

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AdminUserSetUserAdmin(generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminCheck]

    def update(self, request, *args, **kwargs):
        user_id = kwargs.get('pk') 
        user = UserAccount.objects.get(id=user_id)
        user.is_admin = True
        user.save()

        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AdminUserDeleteView(generics.DestroyAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminCheck]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def generate_charts(df):
    charts = {}
    for chart_type in ['bar', 'line', 'hist', 'box', 'area', 'barh', 'density']:
        chart = generate_chart(df, chart_type)
        if chart:
            charts[chart_type] = chart
    return charts

def generate_chart(df, chart_type):
    try:
        plt.figure()  # Create a new figure for each chart
        if chart_type == 'bar':
            df.plot(kind='bar')
        elif chart_type == 'line':
            df.plot(kind='line')
        elif chart_type == 'hist':
            df.plot(kind='hist')
        elif chart_type == 'box':
            df.plot(kind='box')
        elif chart_type == 'area':
            df.plot(kind='area')
        elif chart_type == 'barh':
            df.plot(kind='barh')
        elif chart_type == 'density':
            df.plot(kind='density')
        else:
            return None
        img_buffer = BytesIO()
        plt.savefig(img_buffer, format='png')
        img_buffer.seek(0)
        img_base64 = base64.b64encode(img_buffer.getvalue()).decode('utf-8')
        plt.close()  # Close the plot
        return img_base64
    except Exception as e:
        print(f"Error generating {chart_type} chart: {e}")
        return None

class UserUploadFileView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        file = request.FILES['file']
        try:
            df = self.read_file(file)
            charts_base64 = generate_charts(df)
            self.delete_file(file)
            return Response({'charts': charts_base64}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def read_file(self, file):
        file_extension = file.name.split('.')[-1].lower()
        if file_extension == 'csv':
            return pd.read_csv(file, encoding='utf-8')
        elif file_extension in ['xls', 'xlsx']:
            return pd.read_excel(file, engine='openpyxl')
        else:
            raise ValueError("Unsupported file format")

    def delete_file(self, file):
        if os.path.exists(file.name):
            os.remove(file.name)
        else:
            print("The file does not exist")

class UserDatabaseView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        db_type = request.data.get('db_type')
        host = request.data.get('host')
        port = request.data.get('port')
        dbname = request.data.get('dbname')
        user = request.data.get('user')
        password = request.data.get('password')
        table = request.data.get('table')

        try:
            if db_type == 'sqlite':
                file = request.FILES.get('file')
                temp_file_path = 'temp.sqlite'

                # Write uploaded file to a temporary file
                with open(temp_file_path, 'wb+') as temp_file:
                    for chunk in file.chunks():
                        temp_file.write(chunk)
                # Connect to the temporary SQLite database file
                conn = sqlite3.connect(temp_file_path)
                df = pd.read_sql_query(f"SELECT * FROM {table}", conn)
                conn.close()
            elif db_type == 'mysql':
                engine = create_engine(f'mysql+mysqlconnector://{user}:{password}@{host}:{port}/{dbname}')
                df = pd.read_sql_query(f"SELECT * FROM {table}", engine)
            elif db_type == 'postgresql':
                engine = create_engine(f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{dbname}')
                df = pd.read_sql_query(f"SELECT * FROM {table}", engine)
            else:
                return Response({'error': 'Unsupported database type'}, status=status.HTTP_400_BAD_REQUEST)

            # Convert columns to numeric if possible
            numeric_columns = df.select_dtypes(include='object').columns
            for col in numeric_columns:
                try:
                    df[col] = pd.to_numeric(df[col])
                except ValueError:
                    pass
            
            # Generate charts
            charts_base64 = generate_charts(df)
            
            # Delete temporary file
            if db_type == 'sqlite' and os.path.exists(temp_file_path):
                os.remove(temp_file_path)
            print(df)    
            return Response({'charts': charts_base64}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)