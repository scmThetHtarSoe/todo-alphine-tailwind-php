<?php

include_once("api/createDB.php");
include_once("api/createTable.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>To Do Lists</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="view/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <div class="flex justify-center items-center h-screen">
        <div class="container shadow w-[500px] h-auto p-8" x-data="todoApp()">
            <h2 class="title text-3xl">Todo</h2>
            <div id="form" class="flex mt-4 w-full">
                <form method="POST" id="todoForm" class="w-full">
                    <input type="text" name="texts" id="list-text" class="border border-gray-300 w-10/12 p-2 focus:outline-blue-500" placeholder="Add New..." x-model="message" @keyup.enter="addTodo" />
                    <button @click="addTodo" type="submit" name="submit" id="submit" class="bg-blue-400 px-4 pt-1 pb-2 text-xl text-white ml-4 items-center leading-normal">
                        +
                    </button>
                </form>
            </div>
            <span id="errMsg" class="text-red-500"></span>
            <div class="flex mt-4">
                <button type="button" id="all" class="flex-1 border border-gray-200 px-12 py-2" @click="showAll">
                    All
                </button>
                <button type="button" name="notdone" id="notdone" class="flex-1 border border-gray-200 px-12 py-2 mx-2" @click="showActive">
                    Active
                </button>
                <button type="button" id="done" class="flex-1 border border-gray-200 px-8 py-2" @click="showCompleted">
                    Completed
                </button>
            </div>
            <!-- <ul class="getallLists"></ul> -->
            <ul class="list-group mt-4">
                <template x-for="data in getLists" class="template-append">
                    <li class="list-group-item">
                        <input type="checkbox" class="getCheckbox" x-model="data.status" @click="check(event.target,data.id)" :checked="data.status ? true : false " />
                        <span :class="data.status ? 'completed text ml-4' : 'text ml-4' " x-text="data.text" @dblclick="editfun(event.target,data.id)"></span>
                        <div class="editinputs getallinputs">
                            <input type="text" :id="`task_edit-${data.id}`" class="form-control-edit" x-model="data.text" @keyup.enter="updatefun(event.target,data.id)" />
                        </div>
                        <span @click="del(event.target,data.id)" id="remove">&times;</span>
                    </li>
                </template>
            </ul>
            <p class="text-gray-500">
                <span id="zero" x-text="leftItem"></span> items left
            </p>
            <div class="flex mt-4">
                <button type="button" id="checkAll" class="flex-1 border border-gray-200 px-8 py-2 mr-4" @click="checkAll(event.target)">
                    Check All
                </button>
                <button type="button" id="cleardone" class="flex-1 border border-gray-200 px-8 py-2" @click="clearCompleted">
                    Clear Completed
                </button>
            </div>
        </div>
    </div>

    <!-- <script src="./script.js"></script> -->
    <script defer src="https://unpkg.com/alpinejs@3.4.2/dist/cdn.min.js"></script>
    <script src="view/script.js"></script>
</body>

</html>