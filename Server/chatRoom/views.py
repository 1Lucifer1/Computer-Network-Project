from datetime import datetime
from typing import List, Any
from chatRoom.models import Info as InfoStorage
from django.http import HttpResponse
from django.shortcuts import render
from django.http.request import HttpRequest


class User:
    user_id = ""
    room_id = 1


class Room:
    user_count = 0
    info_list = []


class Info:
    user_id = ""
    room_id = 1
    content = ""
    date = None

    def toString(self, userId):
        if self.user_id == userId:
            return "Y" + self.content
        else:
            return "O" + self.content


RoomList: List[Room] = []
UserList = []
room_count = 0


def find_User(user_id):
    for user in UserList:
        if user.user_id == user_id:
            return user
    return None


def test(request):
    return HttpResponse("Success")


def addUser(request):
    """
    :type request: HttpRequest
    """
    global RoomList, room_count, UserList
    if request.method == "POST":
        if len(RoomList) > 0:
            print(RoomList[0].user_count)
        user_id = request.POST.get("user")
        # user = User()
        # user.user_id = user_id
        # Room.append(user)
        print(user_id)
        if not find_User(user_id):
            print("newUser")
            newUser = User()
            newUser.user_id = user_id
            newUser.room_id = room_count
            UserList.append(newUser)
            if len(RoomList) == room_count:
                newRoom = Room()
                newRoom.user_count += 1
                RoomList.append(newRoom)
                return HttpResponse("1")
            else:
                RoomList[room_count].user_count += 1
                return HttpResponse("0")
        else:
            if RoomList[find_User(user_id).room_id].user_count == 2:
                return HttpResponse("0")
            else:
                return HttpResponse("1")


def sendMessage(request):
    """
    :type request: HttpRequest
    """
    if request.method == "POST":
        user_id = request.POST.get("user")
        user = find_User(user_id)
        if not user:
            return HttpResponse("-1")
        info = Info()
        info.room_id = user.room_id
        info.user_id = user_id
        info.content = request.POST.get("info")
        info.date = datetime.strftime(datetime.now(), '%Y-%m-%d %H:%M:%S')
        room = RoomList[user.room_id]
        room.info_list.append(info)
        print(room.info_list[-1].toString(user_id))
        return HttpResponse("0")


def getMessage(request):
    """
    :type request: HttpRequest
    """
    if request.method == "POST":
        user_id = request.POST.get("user")
        user = find_User(user_id)
        if not user:
            return HttpResponse("-1")
        room = RoomList[user.room_id]
        ret_info_list = []
        single_info: Info
        for single_info in room.info_list:
            ret_info_list.append(single_info.toString(user_id))
        return HttpResponse("&|&".join(ret_info_list))


def save(requests):
    for room in RoomList:
        for info in room.info_list:
            info_storage = InfoStorage()
            info_storage.user_id = info.user_id
            info_storage.content = info.content
            info_storage.create_time = info.date
            info_storage.save()
    requests.HttpResponse('数据储存完毕')
