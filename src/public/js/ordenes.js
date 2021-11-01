const HTMLOrdenes = document.querySelector('#ordenes');

const renderOrdenes = async () => {

    try {
        const response = await fetch('/ordenes/listar', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        if (data.length) {
            let total = 0;
            const template = data.map((orden) => `
            <tr>
                <td>
                    <details>
                        <summary class="mb-2">Productos</summary>
                        ${orden.productos.map(item => `
                            <small>${item.nombre} - Cant: ${item.cantidad} - PU: $ ${item.precio}</small>
                            <hr class="dropdown-divider">
                        `).join('')}
                    </details>
                </td>
                <td>${orden.email}</td>
                <td>${orden.direccion}</td>
                <td>
                    <span id="estado" class="badge ${orden.estado == 'generada' ? 'bg-secondary' : 'bg-success'}">${orden.estado}</span>
                </td>
                <td>${orden.timestamp}</td>
                <td width="20px">
                    <button class="btn btn-sm btn-primary" type="button" onclick="confirmarOrden('${orden.id}')">
                        Confirmar
                    </button>
                </td>
                <td width="20px">
                    <button class="btn btn-sm btn-danger" type="button" onclick="eliminarOrden('${orden.id}')">
                        Eliminar
                    </button>
                </td>
            </tr>
            `).join('');
            HTMLOrdenes.innerHTML = template;
        } else {
            const template = `<tr>
                                <td colspan="6">No hay ordenes generadas</td>
                            </tr>`
            HTMLOrdenes.innerHTML = template;
        }
    } catch (error) {
        console.log(error);
    }

}


(async () => {
    await renderOrdenes();
})();


const eliminarOrden = async (id) => {

    try {
        const response = await fetch(`/ordenes/borrar/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            method: 'delete'
        });
        const data = await response.json();
        if (Object.keys(data)[0] != 'error') {
            alert('La orden ha sido eliminada')
            renderOrdenes();
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.log(error);
    }

}

const confirmarOrden = async (id) => {
    try {
        const response = await fetch(`/ordenes/confirmar/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            method: 'PUT'
        });
        const data = await response.json();
        if (Object.keys(data)[0] != 'error') {
            alert('La orden ha sido confirmada')
            renderOrdenes();
        } else {
            alert(data.error)
        }
    } catch (error) {
        console.log(error);
    }
}