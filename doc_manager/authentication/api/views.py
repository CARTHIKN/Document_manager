from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import RegisterSerializer, LoginSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            "message": "Account created successfully"
        }, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(username=serializer.validated_data['username'],
                            password=serializer.validated_data['password'])
        print('----------------')
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            refresh["username"] = user.username
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


