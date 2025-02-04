from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pickle
import numpy as np

# 加载已训练的模型
# with open('energy_model.pkl', 'rb') as model_file:
#     model = pickle.load(model_file)

from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to the Vehicle Energy Consumption Prediction API!")


@api_view(['POST'])
def predict_energy_consumption(request):
    try:
        data = request.data
        # 提取用户输入的数据
        speed = data['speed']
        road_condition = data['road_condition']
        distance = data['distance']
        # climate = data['climate']
        # load = data['load']
        print(speed, road_condition, distance)

        # 转换为模型需要的格式
        input_data = np.array([[speed, road_condition, distance]])

        # 进行预测
        # prediction = model.predict(input_data)
        prediction = [1.225]

        # 返回预测结果
        return Response({'predicted_energy_consumption': prediction[0]})

    except Exception as e:
        return Response({'error': f'Error occurred: {str(e)}'}, status=400)
