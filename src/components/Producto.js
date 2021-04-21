import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;

    //con esto debemos declarar el useDispatch para usar lo que hay dentro de los actions
    //de otra forma no funciona, esto es como in termaediario mas o menos
    const dispatch = useDispatch();
    const history = useHistory(); //habilita el useHistory

    // Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        // preguntar al usuario
        Swal.fire({
            title: '¿Estás Seguro?',
            text: "Un producto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //pasarlo al usuario
                dispatch(borrarProductoAction(id));
            }
        })

        
    }

    // Funcion que dirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`);
    }
    
    return(
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">${precio}</span></td>
            <td className="acciones">
                <button 
                    type="button" 
                    className="btn btn-primary mr-2"
                    onClick={() => redireccionarEdicion(producto)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
    );
}


export default Producto;