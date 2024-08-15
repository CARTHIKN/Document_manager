from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from documents.models import File
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from documents.models import File
from django.conf import settings
import boto3
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication




@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])  
def upload_file(request):
    files = request.FILES.getlist('file')
    username = request.data.get('username')
    if not files:
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.get(username=username)
    

    for file in files:
        file_path = default_storage.save(file.name, file)
        file_url = default_storage.url(file_path)
        print(file)
        print(file.name)
        print(file_url)
        uploaded_file = File.objects.create(
            user=user,
            file_name=file.name,
            file_url=file_url
        )
        
    return Response('file uploaded successfully', status=status.HTTP_201_CREATED)



@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])  
def get_uploaded_files(request):
    username = request.GET.get('username')
    

    if not username:
        return Response({'error': 'Username not provided'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    files = File.objects.filter(user=user)
    if not files.exists():
        return Response(status=status.HTTP_200_OK)
    

    file_data = [
        
        {
            'file_name': file.file_name,
            'file_url': file.file_url,
            'id':file.id
        }
        for file in files
    ]

    return Response(file_data, status=status.HTTP_200_OK)



@api_view(['GET']) 
def download_file(request, file_id):
    file = get_object_or_404(File, id=file_id)
    
    # Initialize S3 client
    s3 = boto3.client('s3', 
                      aws_access_key_id=settings.AWS_ACCESS_KEY_ID, 
                      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)

    try:
        # Retrieve the file object from S3
        s3_object = s3.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file.file_name)
        file_content = s3_object['Body'].read()
        file_name = file.file_name
        
        response = HttpResponse(file_content, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_name}"'
        return response
    except Exception as e:
        return HttpResponse(f"Error retrieving file: {str(e)}", status=500)



@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])  
def delete_file(request, file_id):
    file = get_object_or_404(File, id=file_id)
    print(file)
    print('-----------')

    # Initialize S3 client
    s3 = boto3.client('s3', 
                      aws_access_key_id=settings.AWS_ACCESS_KEY_ID, 
                      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    
    print(s3)
    
    print('------=')
    try:
        s3.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file.file_name)
        
        file.delete()

        return Response({'message': 'File deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'error': f"Error deleting file: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

