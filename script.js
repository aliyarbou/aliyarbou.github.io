function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log(startdate);
  console.log(enddate);
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