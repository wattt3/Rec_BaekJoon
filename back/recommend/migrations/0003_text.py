# Generated by Django 4.0.2 on 2022-04-28 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommend', '0002_problem_number'),
    ]

    operations = [
        migrations.CreateModel(
            name='Text',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
            ],
        ),
    ]
