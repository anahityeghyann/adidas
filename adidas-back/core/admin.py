from django.contrib import admin
from .models import Color, Size, Product, ProductImage, Cart, CartItem, Review

# Register your models here.

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ReviewInline(admin.TabularInline):
    model = Review 
    extra = 1



@admin.register(Product)  
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'sale_price', 'is_active')
    filter_horizontal = ('colors', 'sizes')
    inlines = [ProductImageInline, ReviewInline]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'name', 'description', 'posted_date', 'rating')
    list_filter = ('rating',)
    search_fields = ('name', 'product__name')

admin.site.register(Color)
admin.site.register(Size)