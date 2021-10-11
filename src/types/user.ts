interface User {
    displayName: string | undefined;
    photoUrl: string | undefined;
    id: string | undefined;
    address?: string;
    registrationStep: string;
}

export { User };