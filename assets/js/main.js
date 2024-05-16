window.onload = function () {
  let username = "coalition";
  let password = "skills-test";
  let auth = btoa(`${username}:${password}`);

  const url = "https://fedskillstest.coalitiontechnologies.workers.dev";

  fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log("Fetched data:", data);

      const Jessica = data.reduce((acc, obj) => {
        if (obj.name === "Jessica Taylor") {
          acc = obj;
        }
        return acc;
      }, {});

      console.log(Jessica);
      const image = document.getElementById("image");
      image.src = Jessica.profile_picture;
      document.getElementById("name").textContent = Jessica.name;
      document.getElementById("gender").textContent = Jessica.gender;
      document.getElementById("birthdate").textContent = formatDate(
        Jessica.date_of_birth
      );
      document.getElementById("phone").textContent = Jessica.phone_number;
      document.getElementById("emergency").textContent =
        Jessica.emergency_contact;
      document.getElementById("insurance").textContent = Jessica.insurance_type;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedMonth = monthNames[month];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${formattedMonth} ${day}, ${year}`;
  }

  //blod pressure chart

  const data = {
    labels: ["Oct, 2023", "Nov, 2023", "Dec, 2023", "Jan, 2024", "Feb, 2024", "Mar, 2024"],
    datasets: [
      {
        backgroundColor: "#E66FD2",
        borderColor: "#E66FD2",
        borderWidth: 2,
        data: [122, 118, 160, 110, 155, 160],
        lineTension: 0.5
      },
      {
        backgroundColor: "#8C6FE6",
        borderColor: "#8C6FE6",
        borderWidth: 2,
        data: [110, 60, 110, 90, 65, 78],
        lineTension: 0.5
      },
    ],
  };

  // Configuration options for the chart
  const options = {

    scales: {
        x: {
          grid: {
            display: false
          }
        },
       
      },
    
    plugins: {
      legend: {
        display: false,
      },
    },

    
  };

  const ctx = document.getElementById("myChart").getContext("2d");
  const lienChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
};
