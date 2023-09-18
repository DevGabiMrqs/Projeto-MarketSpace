import React from "react";
import { VStack, Text, HStack, Icon, IconButton } from "native-base";

import { Ionicons, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';



export function PaymentMethods() {

    return (
        <VStack ml={6} mt={6}>
            <Text color={"gray.100"} fontSize={14} fontFamily={"heading"}>Meios de pagamento:</Text>
            <VStack>
                <HStack alignItems="center">
                    <IconButton icon={<Ionicons name="ios-barcode-sharp" size={20} color="black" />} />
                    <Text>Boleto</Text>
                </HStack>

                <HStack alignItems="center">
                    <IconButton icon={<MaterialIcons name="qr-code" size={20} color="black" />} />
                    <Text>Pix</Text>
                </HStack>

                <HStack alignItems="center">
                    <IconButton icon={<MaterialIcons name="attach-money" size={20} color="black" />} />
                    <Text>Dinheiro</Text>
                </HStack>

                <HStack alignItems="center">
                    <IconButton icon={<AntDesign name="creditcard" size={20} color="black" />} />
                    <Text>Cartão de Crédito</Text>
                </HStack>

                <HStack alignItems="center" mb={10}>
                    <IconButton icon={<MaterialCommunityIcons name="bank-outline" size={20} color="black" />} />
                    <Text>Depósito Bancário</Text>
                </HStack>
            </VStack>
        </VStack>
    )
}