  //signup
  document.getElementById("submit").addEventListener("click", function() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('psw').value;
    let confirmpass = document.getElementById('psw1').value;
    /*if (pass === confirmpass)
    {
        const data = { name: name, password: pass, email: email };
        console.log(data);
        fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
            }
    console.log(name);*/
});
