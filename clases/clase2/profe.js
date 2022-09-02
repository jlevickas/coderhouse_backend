// const objetoPersona = {
//     nombre: "Juan"
// }





// const objetoPersona2 = objetoPersona

// // console.log(objetoPersona2.nombre)

// objetoPersona.nombre = "Pedro"

// // console.log(objetoPersona2.nombre)


// let nombre = "Juan"

// {
//     let nombre = "Pedro"
//     console.log(nombre)
// }

// console.log(nombre)

// let nombre2 = nombre

// nombre = "Pedro"

// console.log(nombre2)



/////////////////////   funciones

function nombre(...nombres){
    console.log(nombres)
    // console.log('Saludo a ', param1)
    // console.log('Saludo a ', param3)
    // console.log('Saludo a ', param2)
  }
  
  nombre('fede', 'juan', 'facu')
  
  
  ///////////////// ejemplo closure
  
  function crearGritarNombre(nombre) {
     const signosDeExclamacion = '!!!' // variables locales
     return function () {
         console.log(`${nombre}${signosDeExclamacion}`)
     }
  }
  
  const gritarCH = crearGritarNombre('coderhouse') // closure
  
  gritarCH() // muestra por pantalla: coderhouse!!!
  
  
  ////////////////////////// template string
  
  
  
  //////////////////// clases
  
  class Persona {
     constructor(nombre, edad) {
         this.nombre = nombre
         this.edad = edad
     }
  
     static saludoCorto = 'hola'
  
     saludoCompleto() {
         console.log(`buenaaass, soy ${this.nombre}`)
     }
  
     saludoEstatico() {
         console.log(Persona.saludoCorto)
     }
  }
  
  const persona = new Persona('Fede', 25)
  
  class Usuario extends Persona{
    
    constructor(nombre, edad, tipo){    
      super(nombre, edad)
      this.tipo = tipo
    }
    
    mostrarTipo(){
      console.log(this.tipo)
    }
  }
  
  const usuario = new Usuario('Juan', 25, 'admin')
  usuario.nombre
  usuario.edad
  usuario.tipo
  usuario.mostrarTipo()
  // usuario.mostrarTipo()