<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>To Do Lists</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="./style.css" rel="stylesheet" type="text/css" />
</head>

<body>
  <div class="flex justify-center items-center h-screen">
    <div class="container shadow w-[500px] h-auto p-8">
      <h2 class="title text-3xl">Todo</h2>

      <div id="form" class="flex mt-4 w-full">
        <form method="POST" id="todoForm" class="w-full">
          <input type="text" name="texts" id="list-text" class="border border-gray-300 w-4/5 p-2 focus:outline-blue-500" placeholder="Add New..." />
          <button type="submit" name="submit" id="submit" class="bg-blue-400 px-4 pt-1 pb-2 text-xl text-white ml-2 items-center leading-normal">
            +
          </button>
        </form>
      </div>
      <span id="errMsg" class="text-red-500"></span>

      <div class="flex mt-4">
        <button type="button" id="all" class="flex-1 border border-gray-200 px-12 py-2">
          All
        </button>
        <button type="button" name="notdone" id="notdone" class="flex-1 border border-gray-200 px-12 py-2 mx-2">
          Active
        </button>
        <button type="button" id="done" class="flex-1 border border-gray-200 px-8 py-2">
          Completed
        </button>
      </div>

      <ul class="getallLists"></ul>
      <p class="text-gray-500">
        <span id="zero"></span> items left
      </p>
      <div class="flex mt-4">
        <button type="button" id="checkAll" class="flex-1 border border-gray-200 px-8 py-2 mr-4">
          Check All
        </button>
        <button type="button" id="cleardone" class="flex-1 border border-gray-200 px-8 py-2">
          Clear Completed
        </button>
      </div>
    </div>
  </div>

  <?php
  $url = $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);
  ?>

  <script>
    const getUrl = <?php echo json_encode($url) ?>;
  </script>
  <script src="./script.js"></script>
</body>

</html>