from django.contrib import admin
from payments.models import Payment

# decorator
@admin.register(Payment)

# Register your models here.
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id','table','statusPayment','paymentType','created_at']