firebase.initializeApp({
    apiKey: "AIzaSyAHK6_OT_lE2pmp1wYjbtr7CdHj-7PhNtE",
    authDomain: "proyectousuarios-2d871.firebaseapp.com",
    projectId: "proyectousuarios-2d871"
  });
  
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

  //guardar
  function guardar() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

  db.collection("users").add({
      first: nombre,
      last: apellido,
      born: fecha
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
}
    //listar en tabla
    var tabla = document.getElementById('tabla');
    db.collection("users").onSnapshot((querySnapshot) => {
        tabla.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().fisrt}`);
            tabla.innerHTML += `
            <tr>

            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().born}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="modificar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Modificar</button/></td>
            </tr> 
            `
            
        });
    });

    //borrar
    function eliminar(id) {
        db.collection("users").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    
    }

    //actualizar
   

    function modificar(id, nombre, apellido, fecha) {

        document.getElementById('nombre').value = nombre;
        document.getElementById('apellido').value = apellido;
        document.getElementById('fecha').value = fecha;

        var boton = document.getElementById('boton');
        boton.innerHTML = 'Modificar';

        boton.onclick = function() {
            var washingtonRef = db.collection("users").doc(id);
           // Set the "capital" field of the city 'DC'

           var nombre = document.getElementById('nombre').value;
           var apellido = document.getElementById('apellido').value;
           var fecha = document.getElementById('fecha').value;
        return washingtonRef.update({
            first: nombre,
            last: apellido,
            born: fecha
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        }
        
    }

 
