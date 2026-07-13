from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Color(models.Model):
    name = models.CharField(max_length=50)
    hex= models.CharField(max_length=7, blank=True)
    def __str__(self):
        return self.name

class Size(models.Model):
    name = models.CharField(max_length=7)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="products/", blank=True,null=True )
    price = models.DecimalField(max_digits=8, decimal_places=2)
    sale_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    colors = models.ManyToManyField(Color, blank=True)
    sizes = models.ManyToManyField(Size, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def current_price(self):
        return self.sale_price or self.price

    def __str__(self):
        return f"{self.id} - {self.name}"
    

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/")
    is_main = models.BooleanField(default=False)



class Cart(models.Model):
    session_key = models.CharField(max_length=40, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)



class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    class Meta:
        unique_together = ("cart", "product")


class Review(models.Model):
    product = models.ForeignKey(Product, related_name="reviews", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    posted_date = models.DateTimeField(auto_now_add=True)
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Enter a rating between 1 and 5"
    )

    class Meta:
        ordering = ["-posted_date"]

    def __str__(self):
        return f"{self.rating} review by {self.name} for {self.product.name}"