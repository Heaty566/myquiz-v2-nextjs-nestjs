interface FakeDataType {
        number: string;
}

const fakePattern: FakeDataType = {
        number: '0123456789',
};

export function otpGenerator(length: number, type: keyof FakeDataType = 'number') {
        let result = '';
        const characters = fakePattern[type];
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
}
