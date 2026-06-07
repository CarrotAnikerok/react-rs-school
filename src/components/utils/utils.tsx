export function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
} 

export function getPasswordStrength(password: string) {
    let strength = 0;
    
    if (/\d/.test(password)) {
        strength +=1;
    }

    if (/[A-Z]/.test(password)) {
        strength +=1;
    }

    if (/[a-z]/.test(password)) {
        strength +=1;
    }

    if (/[.&?@#$,!:;'"]/.test(password)) {
        strength +=1;
    }

    switch (strength) {
        case 1:
            return 'Very bad';
        case 2:
            return 'Bad'
        case 3:
            return 'Good'
        case 4:
            return 'Perfect'
        default:
            return '';
    }

}