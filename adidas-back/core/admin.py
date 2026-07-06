from django.contrib import admin
from .models import Color, Size, Product, ProductImage, Cart, CartItem

# Register your models here.

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)  
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'sale_price', 'is_active')
    filter_horizontal = ('colors', 'sizes')
    inlines = [ProductImageInline]

admin.site.register(Color)
admin.site.register(Size)