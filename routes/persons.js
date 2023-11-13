const express = require('express'); //requerir
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

const helpers = require('../lib/helpers'); //quiero los dos metos o todo

var passwordValidator = require('password-validator');
var schema = new passwordValidator();

router.get('/add',isLoggedIn,  (req, res) =>{ 
    res.render('persons/add');    
});

router.post('/add',isLoggedIn, async(req, res) => {   // 
    
    const { name, lastname, dni, date_birth, sex, address, 	email, username, password, 	status, kind } = req.body;      
    
    schema
        .is().min(8, 'Minimo 8 caracteres la contraseña')              // Minimum length 8
        .is().max(100, 'Maximo 100 caracteres la contraseña')                                  // Maximum length 100
        .has().uppercase(1, 'Debe contener almenos una letra mayúscula la contraseña')                              // Must have uppercase letters
        .has().lowercase(1, 'Debe contener almenos una letra minúscula la contraseña')                              // Must have lowercase letters
        .has().digits(1,'Debe tener al menos 1 digitos la contraseña')    // Must have at least 2 digits
        .has().symbols(1, 'Debe tener almenos 1 símbolo la contraseña')
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

        const err = schema.validate(password, { details: true });

    if( password == ""){  // 1- si Passwor no tiene contenido
        //'no hay caracteres, no se guarda'
        req.flash('message', 'ingrese una contraseña');
        res.redirect('/persons/add');

    }else if(schema.validate(password) == true) {  // 2 - cuando tiene contraseña - y la validacion da TRue 
 
        const newPerson = {
            name,
            lastname,
            dni,
            date_birth,
            sex,
            address,
            email,
            username,
            password,
            status,
            kind        
        }; 

        newPerson.password = await helpers.encryptPassword(password);  // antes de guardar se cifra 
        
        try {  // tema duplidad de correo
            await pool.query('INSERT INTO user set ?', [newPerson]);    
            req.flash('success', 'Usuario guardado con éxito');
            res.redirect('/persons');  
        } catch (error) {
            
            if (error.code === 'ER_DUP_ENTRY') { // CORREO --un solo unicode..por mientras
                //Correo existente - ingrese otro"
                function filterArray(inputArr){
                    var found ={};
                    var out = inputArr.filter(function(element){
                        return found.hasOwnProperty(element.message)? false : (found[element.message]=true);
                    });
                    return out;
                }
                var errors = filterArray(err);
        
                var sexo = parseInt(sex);
                var estado = parseInt(status);
                var tipo = parseInt(kind);
                
                var evaluando = error.sqlMessage;
                var respt_email = evaluando.includes('email');
                var respt_username = evaluando.includes('username');
                var respt_dni = evaluando.includes('dni');

                if (respt_email == true) {
                    errors.push({message: 'Correo electronico en uso, ingrese otro, gracias.'});                    
                } 
                if(respt_username == true){
                    errors.push({message: 'Nombre de usuario en uso, ingrese otro, gracias.'});  
                }
                if(respt_dni == true){
                    errors.push({message: 'Dni en uso, ingrese otro, gracias.'});  
                }   
  
                res.render('persons/add', {
                    errors,
                    name,
                    lastname,
                    dni,
                    date_birth,
                    sexo,
                    address,
                    email,
                    username,
                    password,
                    estado,
                    tipo 
                } );

            } else {
               // "para mas errores"               
            }
        }   // final

    }else {  // 3 - cuanto tiene contraseña - pero la validacion da FALSE
       
        function filterArray(inputArr){
            var found ={};
            var out = inputArr.filter(function(element){
                return found.hasOwnProperty(element.message)? false : (found[element.message]=true);
            });
            return out;
        }

        var sexo = parseInt(sex);
        var estado = parseInt(status);
        var tipo = parseInt(kind);
       
        const errors = filterArray(err);
        res.render('persons/add', {
            errors,
            name,
            lastname,
            dni,
            date_birth,
            sexo,
            address,
            email,
            username,
            estado,
            tipo 
        } );
        
    }
    
});

router.get('/', isLoggedIn, async (req, res) => {
    
    if ( req.user.kind == 1) {
        const persons = await pool.query('SELECT * FROM user');
        res.render('persons/list', { persons });
    } else {
        const persons = await pool.query('SELECT * FROM user WHERE id = ?', [req.user.id]);
        res.render('persons/list', { persons });
    }
    
});

router.get('/delete/:id', isLoggedIn, async(req, res) => {
       
    const { id } = req.params;

    if(id == 1){
        req.flash('success', 'Usuario con permisos para no ser eliminado.');
        res.redirect('/persons');
    }else{
        await pool.query('DELETE FROM user WHERE ID = ?', [id]);

        req.flash('success', 'Usuario eliminado con éxito');
        res.redirect('/persons');
    }
    
});

router.get('/edit/:id', isLoggedIn, async(req, res) => {
    
    const { id } = req.params;
    const persons = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
    res.render('persons/edit', { person: persons[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
   
    const { id } = req.params;
    const { name, lastname, dni, date_birth, sex, address, email, username, password, status, kind } = req.body;  

    if (req.user.kind == 1) {  //Cuando es ADMIN

        if ( password == undefined ) { // modifica todo -> password no editado se mantiene igual
            //"No Modificar la contraseña"
    
            const person = {
                id,
                name,
                lastname,
                dni,
                date_birth,
                sex,
                address,
                email,
                username,            
                status,
                kind  
            }; 
            
            try {
                await pool.query('UPDATE user SET ? WHERE id = ?', [person, id]);
                req.flash('success', 'Usuario actualizado con éxito');
                res.redirect('/persons');
            } catch (error) {
                
                if (error.code === 'ER_DUP_ENTRY') { // EMAIL - USERNAME - DNI
                    var errors = [];

                    person.sex = Number(sex);
                    person.status = Number(status);
                    person.kind = Number(kind);
                   
                    var evaluando = error.sqlMessage;
                    var respt_email = evaluando.includes('email');
                    var respt_username = evaluando.includes('username');
                    var respt_dni = evaluando.includes('dni');

                    if (respt_email == true) {
                        errors.push({message: 'Correo electronico en uso, ingrese otro, gracias.'});                    
                    } 
                    if(respt_username == true){
                        errors.push({message: 'Nombre de usuario en uso, ingrese otro, gracias.'});  
                    }
                    if(respt_dni == true){
                        errors.push({message: 'Dni en uso, ingrese otro, gracias.'});  
                    }   

                    res.render('persons/edit', {
                        errors,
                        person
                    } );  

                } else {
                    //"para mas errores"               
                }
            }           
    
        }else { // modifica todo -> password modificado ingresa aqui 
            //"Si guardar nueva contraseña"  

            schema
                .is().min(8, 'Minimo 8 caracteres la contraseña')              // Minimum length 8
                .is().max(100, 'Maximo 100 caracteres la contraseña')                                  // Maximum length 100
                .has().uppercase(1, 'Debe contener almenos una letra mayúscula la contraseña')                              // Must have uppercase letters
                .has().lowercase(1, 'Debe contener almenos una letra minúscula la contraseña')                              // Must have lowercase letters
                .has().digits(1,'Debe tener al menos 1 digito la contraseña')    // Must have at least 2 digits
                .has().symbols(1, 'Debe tener al menos 1 símbolo la contraseña')
                .has().not().spaces()                           // Should not have spaces
                .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
                
            const err = schema.validate(password, { details: true });           

            if(schema.validate(password) == true){// validacion de nueva contraseña Exitosa                
                //"Password se va guardar"
                const personEnviar = {
                    id,
                    name,
                    lastname,
                    dni,
                    date_birth,
                    sex,
                    address,
                    email,
                    username,
                    password,            
                    status,
                    kind  
                }; 
                
                personEnviar.password = await helpers.encryptPassword(password);
                
                try {
                    await pool.query('UPDATE user SET ? WHERE id = ?', [personEnviar, id]);
                    req.flash('success', 'Usuario actualizado con éxito');
                    res.redirect('/persons');
                } catch (error) {
                    
                    if (error.code === 'ER_DUP_ENTRY') { // EMAIL - USERNAME - DNI    
                        var errors = [];

                        const person = {
                            id,
                            name,
                            lastname,
                            dni,
                            date_birth,
                            sex,
                            address,
                            email,
                            username,                       
                            status,
                            kind  
                        }; 

                        person.sex = Number(sex);
                        person.status = Number(status);
                        person.kind = Number(kind);
                       
                        var evaluando = error.sqlMessage;
                        var respt_email = evaluando.includes('email');
                        var respt_username = evaluando.includes('username');
                        var respt_dni = evaluando.includes('dni');
    
                        if (respt_email == true) {
                            errors.push({message: 'Correo electronico en uso, ingrese otro, gracias.'});                    
                        } 
                        if(respt_username == true){
                            errors.push({message: 'Nombre de usuario en uso, ingrese otro, gracias.'});  
                        }
                        if(respt_dni == true){
                            errors.push({message: 'Dni en uso, ingrese otro, gracias.'});  
                        }   
    
    
                        res.render('persons/edit', {
                            errors,
                            person
                        } );      
    
                    } else {
                        //"para mas errores"               
                    }
                } 

            }else { // validacion errada de contraseña - ERROR devolverlos a la vista
               // "password no tiene caracter "               
               
               const person = {
                    id,
                    name,
                    lastname,
                    dni,
                    date_birth,
                    sex,
                    address,
                    email,
                    username,
                    status,
                    kind  
                };  

                person.sex = Number(sex);
                person.status = Number(status);
                person.kind = Number(kind);               

                function filterArray(inputArr){
                    var found ={};
                    var out = inputArr.filter(function(element){
                        return found.hasOwnProperty(element.message)? false : (found[element.message]=true);
                    });
                    return out;
                }

                const errors = filterArray(err);                
                
                res.render('persons/edit', {
                    errors,
                    person
                } );
            }

        }

    }else {    // CUando es ENCARGADO  
        // que no guarde el stauts y el kind porque es Empleado
        
        if ( password == undefined ) { // modifica todo -> password no editadoa se mantiene igual
            //"No Modificar la contraseña"    
            const person = {
                id,
                name,
                lastname,
                dni,
                date_birth,
                sex,
                address,
                email,
                username  
            }; 
            
            try {
                await pool.query('UPDATE user SET ? WHERE id = ?', [person, id]);
                req.flash('success', 'Usuario actualizado con éxito');
                res.redirect('/persons');
            } catch (error) {
                
                if (error.code === 'ER_DUP_ENTRY') { // EMAIL - USERNAME - DNI

                    var errors = [];

                    person.sex = Number(sex);  
                   
                    var evaluando = error.sqlMessage;
                    var respt_email = evaluando.includes('email');
                    var respt_username = evaluando.includes('username');
                    var respt_dni = evaluando.includes('dni');

                    if (respt_email == true) {
                        errors.push({message: 'Correo electronico en uso, ingrese otro, gracias.'});                    
                    } 
                    if(respt_username == true){
                        errors.push({message: 'Nombre de usuario en uso, ingrese otro, gracias.'});  
                    }
                    if(respt_dni == true){
                        errors.push({message: 'Dni en uso, ingrese otro, gracias.'});  
                    }   

                    res.render('persons/edit', {
                        errors,
                        person
                    } );  

                } else {
                    //"para mas errores"                
                }
            }           
    
        }else { // modifica todo -> password modificado ingresa aqui 
            //"Si guardar nueva contraseña" 

            schema
                .is().min(8, 'Minimo 8 caracteres la contraseña')              // Minimum length 8
                .is().max(100, 'Maximo 100 caracteres la contraseña')                                  // Maximum length 100
                .has().uppercase(1, 'Debe contener almenos una letra mayúscula la contraseña')                              // Must have uppercase letters
                .has().lowercase(1, 'Debe contener almenos una letra minúscula la contraseña')                              // Must have lowercase letters
                .has().digits(1,'Debe tener al menos 1 digito la contraseña')    // Must have at least 2 digits
                .has().symbols(1, 'Debe tener al menos 1 símbolo la contraseña')
                .has().not().spaces()                           // Should not have spaces
                .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
                
            const err = schema.validate(password, { details: true });           

            if(schema.validate(password) == true){// validacion de nueva contraseña Exitosa                
                //"Password se va guardar"
                const personEnviar = {
                    id,
                    name,
                    lastname,
                    dni,
                    date_birth,
                    sex,
                    address,
                    email,
                    username,
                    password
                }; 

                personEnviar.password = await helpers.encryptPassword(password);
                
                try {
                    await pool.query('UPDATE user SET ? WHERE id = ?', [personEnviar, id]);
                    req.flash('success', 'Usuario actualizado con éxito');
                    res.redirect('/persons');
                } catch (error) {
                    
                    if (error.code === 'ER_DUP_ENTRY') { // EMAIL - USERNAME - DNI    
                        var errors = [];

                        const person = {
                            id,
                            name,
                            lastname,
                            dni,
                            date_birth,
                            sex,
                            address,
                            email,
                            username
                        }; 

                        person.sex = Number(sex);
                       
                        var evaluando = error.sqlMessage;
                        var respt_email = evaluando.includes('email');
                        var respt_username = evaluando.includes('username');
                        var respt_dni = evaluando.includes('dni');
    
                        if (respt_email == true) {
                            errors.push({message: 'Correo electronico en uso, ingrese otro, gracias.'});                    
                        } 
                        if(respt_username == true){
                            errors.push({message: 'Nombre de usuario en uso, ingrese otro, gracias.'});  
                        }
                        if(respt_dni == true){
                            errors.push({message: 'Dni en uso, ingrese otro, gracias.'});  
                        }   
    
    
                        res.render('persons/edit', {
                            errors,
                            person
                        } );      
    
                    } else {
                        //"para mas errores"                
                    }
                } 

            }else { // validacion errada de contraseña - ERROR devolverlos a la vista
               //"password no tiene caracter "               
               
               const person = {
                    id,
                    name,
                    lastname,
                    dni,
                    date_birth,
                    sex,
                    address,
                    email,
                    username 
                };  

                person.sex = Number(sex);

                function filterArray(inputArr){
                    var found ={};
                    var out = inputArr.filter(function(element){
                        return found.hasOwnProperty(element.message)? false : (found[element.message]=true);
                    });
                    return out;
                }

                const errors = filterArray(err);                
                
                res.render('persons/edit', {
                    errors,
                    person
                } );
            }

        }
        
    }  
    
});


module.exports = router;
