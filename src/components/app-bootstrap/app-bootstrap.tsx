import React, { ReactElement, ReactNode } from 'react'
import { useFonts, DeliusUnicase_400Regular, DeliusUnicase_700Bold } from '@expo-google-fonts/delius-unicase';
import AppLoading from 'expo-app-loading';

interface AppBootstrapProps {
    children: ReactNode;
}

export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement {

    const [fontLoader] = useFonts({
        DeliusUnicase_400Regular,
        DeliusUnicase_700Bold
    });

    return fontLoader ? <>{children}</> : <AppLoading />
}
