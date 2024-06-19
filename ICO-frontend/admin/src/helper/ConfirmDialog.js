import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export const deleteConfirmDialog = (type) => {
    return (
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to retrieve`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'blue',
            confirmButtonText: 'Delete',

        }).then((result) => {
            return result.isConfirmed
        })
    )
}
export const saveConfirmDialog = (text) => {

    return (
        Swal.fire({
            title: 'Are you sure?',
            text: text,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',

        }).then((result) => {
            return result.isConfirmed
        })
    )
}

export default { saveConfirmDialog, deleteConfirmDialog }