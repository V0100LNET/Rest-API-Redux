import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
} from '../types'

//cada reducer tien su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoeliminar: null,
    productoeditar: null
}

export default function(state = initialState, action){
    switch(action.type){
        case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: true
            }

        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        
        case PRODUCTO_ELIMINADO_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTOS_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case DESCARGAR_PRODUCTOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productos: action.payload

            }

        case OBTENER_PRODUCTO_ELIMINAR:
            return{
                ...state,
                productoeliminar: action.payload
            }

        case PRODUCTO_ELIMINADO_EXITO: 
            return{
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoeliminar),
                productoeliminar: null
            }

        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoeditar: action.payload 
            }




        default:
            return state;
    }
}