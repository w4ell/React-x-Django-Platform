# Generated by Django 5.0.4 on 2024-05-02 15:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_useraccount_birth_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='birth_date',
            field=models.DateField(default=datetime.date(1900, 1, 1)),
        ),
    ]
