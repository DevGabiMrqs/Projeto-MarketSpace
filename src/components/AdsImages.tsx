import React from "react"
import { HStack, Text, Image, VStack, Box} from "native-base"
import { Photo } from "./Photo"


export function AdsImages() {


    return (
        <VStack>
            <HStack justifyContent="space-between" m={2}>
                <VStack position="relative">
                    <Box position="absolute" zIndex={1} top={1} left={1}>
                        <Photo size={8}/>
                    </Box>

                    <Box bgColor="gray.200" borderRadius={50} position="absolute" zIndex={1} top={1} right={1}>
                        <Text color="gray.700" p={1} fontSize={12}>USADO</Text>
                    </Box>

                    <Box>
                        <Image
                        alt="Imagem do anúncio"
                        bgColor="blue.300"
                        width={153}
                        height={120}
                        borderRadius={10}
                        /> 
                    </Box>
                        <Text fontFamily="heading" fontSize={14} color="gray.200">
                            Tênis Vermelho
                        </Text>
                        <Text fontFamily="heading" fontSize={16} color="gray.100">
                            R$ 59,90
                        </Text>
                </VStack>
          

            
                <VStack position="relative">
                    <Box position="absolute" zIndex={1} top={1} left={1}>
                        <Photo size={8}/>
                    </Box>

                    <Box bgColor="blue.100" borderRadius={50} position="absolute" zIndex={1} top={1} right={1}>
                        <Text color="gray.700" p={1} fontSize={12}>NOVO</Text>
                    </Box>

                    <Box>
                        <Image
                        alt="Imagem do anúncio"
                        bgColor="blue.300"
                        width={153}
                        height={120}
                        borderRadius={10}
                        /> 
                    </Box>
                        <Text fontFamily="heading" fontSize={14} color="gray.200">
                            Tênis Vermelho
                        </Text>
                        <Text fontFamily="heading" fontSize={16} color="gray.100">
                            R$ 59,90
                        </Text>
                </VStack>
            </HStack>
           
        </VStack>
    )
}