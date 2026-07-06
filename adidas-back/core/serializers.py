from rest_framework import serializers
from .models import (Product, ProductImage, Color, Size, CartItem)

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


class ProductSerializer(serializers.ModelSerializer):
    colors = ColorSerializer(many=True)
    sizes = SizeSerializer(many=True)
    images = ProductImageSerializer(many=True)
    current_price = serializers.SerializerMethodField()

    def get_current_price(self, obj):
        return obj.current_price()


    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "sale_price" , "current_price", "colors", "sizes", "images"]



class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = ["product", "quantity"]




