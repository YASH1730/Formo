const initialAlert = {
    open: false,
    message: null,
    variant: null
}

export const alert = (state = initialAlert, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return state = action.payload;
        default:
            return state;
    }
}

const initialAuth = {
    isAuth: false,
    role: null,
    token: null,
    access: [],

}

export const auth = (state = initialAuth, action) => {
    switch (action.type) {
        case 'AUTH':
            return state = action.payload;
        default:
            return state;
    }
}

const initialForm = {
    state: false,
    formType: null,
    payload: null,
    row: null,
    setRow: null

}

export const form = (state = initialForm, action) => {
    switch (action.type) {
        case 'FORM':
            return state = action.payload;
        default:
            return state;
    }
}
