function updateParticipants(taskId) {
    const participants = document.querySelector("input[name=participants]").value;
    console.log(participants);

    fetch(`/task/participants/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({ participants }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .catch(console.log);
}

function updateTags(taskId) {
    const tags = document.querySelector("input[name=tags]").value;
    console.log(tags);

    fetch(`/task/tags/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({ tags }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .catch(console.log);
}

function editDescription(taskId) {
  const description = document.querySelector("#description").value;
  console.log(description);

  fetch(`/task/description/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ description }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .catch(console.log);
}