import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types'

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto());

        try{
            //insertar en la api
            await clienteAxios.post('/productos', producto);

            //si todo sale bien actualiza el state
           dispatch(agregarProductoExito(producto));
           //alerta
           Swal.fire(
               'Correcto',
               'El producto se agregó correctamente',
               'success'
           )
        } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(true));

            //alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error',
                text: 'Ocurrió un error, intentalo de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
});

//si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hbi un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})