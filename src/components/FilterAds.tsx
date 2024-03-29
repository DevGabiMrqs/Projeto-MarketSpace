import React from "react";
import { Actionsheet, VStack, Text, useDisclose, Button, Switch, Checkbox, HStack } from "native-base";
import { ButtonMadeUp } from "./ButtonMadeUp";
import { TouchableOpacity } from "react-native";
import colors from "native-base/lib/typescript/theme/base/colors";



export function FilterAds() {
            
    const { isOpen, onClose } = useDisclose();
            
            return (
              <VStack>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Text>Filtrar Anúncios</Text>

                        <Text>Condições</Text>
                        <HStack>
                            <Actionsheet.Item>NOVO</Actionsheet.Item>
                            <Actionsheet.Item>USADO</Actionsheet.Item>
                        </HStack>

                        <Text>Aceita troca?</Text>
                        <Switch size="md"/>

                        <Text>Meios de pagamentos aceitos</Text>
                        <Checkbox value="one">Boleto</Checkbox>
                        <Checkbox value="one">Pix</Checkbox>
                        <Checkbox value="one">Dinheiro</Checkbox>
                        <Checkbox value="one">Cartão de Crédito</Checkbox>
                        <Checkbox value="one">Depósito Bancário</Checkbox>

                        <HStack>
                            <ButtonMadeUp title={"Resetar filtros"} variante={"blue.200"} colors={"gray.700"}/>
                            <ButtonMadeUp title={"Aplicar filtros"} variante={"blue.200"} colors={"gray.700"}/>
                        </HStack>

                    </Actionsheet.Content>
                </Actionsheet>
              </VStack>

    )
}
    
