from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from .models import Product, Cart, CartItem
from .serializers import ProductSerializer, CartItemSerializer

# Create your views here.


#session based
#serializers
#json

def get_cart(request):
    if not request.session.session_key:
        request.session.create()
    cart,_ = Cart.objects.get_or_create(session_key = request.session.session_key)
    return cart


class ProductListView(ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True).prefetch_related(
        "colors", "sizes", "images", "reviews"
    )
    serializer_class = ProductSerializer
    lookup_field = "id"


class Cartview (APIView):
    def get(self, request):
        cart = get_cart(request)
        serializer = CartItemSerializer(cart.items.all(), many=True)
        return Response(serializer.data)




class AddToCartView(APIView):
    def post(self, request):
        cart = get_cart(request)
        product_id = request.data.get("product_id")

        item, created = CartItem.objects.get_or_create(
            cart = cart,
            product_id = product_id
        )

        if not created:
            item.quantity += 1
            item.save()

        return Response({"status": "added"})

    

class RemoveFromCartView(APIView):
    def post(self, request):
        cart = get_cart(request)
        product_id = request.data.get("product_id")

        CartItem.objects.filter(
            cart = cart,
            product_id = product_id
        ).delete()

        return Response({"status": "removed"})
    

class UpdateCartItemView(APIView):
    def post(self, request):
        cart = get_cart(request)
        product_id = request.data.get("product_id") or request.data.get("productId")
        quantity = request.data.get("quantity")    
        if quantity is None:
            return Response({"error":"quantity is required"},status=400) 
        try:
            quantity = int(quantity)
        except(TypeError, ValueError):
            return Response({"error":"quantity must be a number"},status=400)
        if quantity <= 0:
            CartItem.objects.filter(cart=cart, product_id=product_id).delete()
            return Response({"status":"removed"}) 
        try:
            item = CartItem.objects.get(cart=cart,product_id=product_id)
            item.quantity = quantity
            item.save()
            return Response({"status":"updated"}) 
        except CartItem.DoesNotExist:
            return Response({"error":"item not found"},status=404) 
