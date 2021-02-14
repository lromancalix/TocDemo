export enum Role {
    root = 'ROOT',
    admin = 'ADMIN',
    user = 'User',
    recepcionista = 'RECEPCIONISTA',
    none = ''
}


export enum eVistaOnboarding {
    DatosOnboarding = 1,
    CapturaID = 2,
    CapturaLiveness = 3,
    ConfirmaDatos = 4
}

export enum eStatusCaptura {
    SinCapturar = 1,
    CapturaExitosa = 2,
    CarturaFallada = 3
}