from django.urls import path
from .views import (ProductListView, ProductDetailView, Cartview, AddToCartView, RemoveFromCartView, UpdateCartItemView)




urlpatterns = [
    path("products/", ProductListView.as_view()),
    path("products/<int:id>/",ProductDetailView.as_view() ),

    path("cart/", Cartview.as_view()),
    path("cart/add/",AddToCartView.as_view() ),
    path("cart/remove/", RemoveFromCartView.as_view()),
    path("cart/update/", UpdateCartItemView.as_view()),
]


