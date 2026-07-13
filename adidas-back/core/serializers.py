from rest_framework import serializers
from django.db.models import Avg
from .models import (Product, ProductImage, Color, Size, CartItem, Review)

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ["id", "name", "hex"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "is_main"]

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ["id", "name"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "name", "description", "posted_date", "rating"] 


class ProductSerializer(serializers.ModelSerializer):
    colors = ColorSerializer(many=True)
    sizes = SizeSerializer(many=True)
    images = ProductImageSerializer(many=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    current_price = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()

    def get_current_price(self, obj):
        return obj.current_price()
    
    def get_average_rating(self, obj):
        avg = obj.reviews.aggregate(avg=Avg("rating"))["avg"]
        if avg is None:
            return None
        return round(float(avg), 1)
    
    def get_review_count(self, obj):
        return obj.reviews.count()


    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "sale_price" , "current_price", "average_rating", "review_count", "colors", "sizes", "images", "reviews"]



class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = ["product", "quantity"]




