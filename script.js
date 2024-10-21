function filterData() {
  event.preventDefault();
  var startdate = new Date(document.getElementById("startdate").value);
  var enddate = new Date(document.getElementById("enddate").value);

  // Get all rows from the table
  var tableRows = document.querySelectorAll("#pitch-table tbody tr");

  tableRows.forEach(row => {
      // Extract the date from the row
      var pitchDate = new Date(row.cells[1].innerText); // Assuming the date is in the second cell (index 1)

      // Check if the pitchDate is within the range
      if (pitchDate >= startdate && pitchDate <= enddate) {
          row.style.display = ""; // Show the row
      } else {
          row.style.display = "none"; // Hide the row
      }
  });
}


    async function fetchPitchData() {
        const url = 'https://compute.samford.edu/zohauth/clients/datajson/1';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            displayPitchData(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    function displayPitchData(data) {
        const tableBody = document.querySelector('#pitch-table tbody');
        tableBody.innerHTML = ''; // Clear existing data

        // Assuming data is an array of pitch objects
        data.forEach(pitch => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a></td>
                <td>${pitch.Date || 'N/A'}</td>
                <td>${pitch.Time || 'N/A'}</td>
                <td>${pitch.Batter || 'N/A'}</td>
                <td>${pitch.Balls || 'N/A'}</td>
                <td>${pitch.Strikes || 'N/A'}</td>
                <td>${pitch.Outs || 'N/A'}</td>
                <td>${pitch.PitchCall || 'N/A'}</td>
                <td>${pitch.KorBB || 'N/A'}</td>
                <td>${pitch.RelSpeed || 'N/A'}</td>
                <td>${pitch.SpinRate || 'N/A'}</td>
                <td>${pitch.SpinAxis || 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Fetch pitch data on page load
    window.onload = fetchPitchData;