// import { Button, FormControl, HStack, Modal, Stack } from "native-base";
// import React from "react";
// import { Input } from "../components/Input";


// export function FilterAds() {
//             const [modalVisible, setModalVisible] = React.useState(false);
//             const initialRef = React.useRef(null);
//             const finalRef = React.useRef(null);
            
//             return (
//                 <>
//                 <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
//                     <Modal.Content>
//                         <Modal.CloseButton />
//                         <Modal.Header>Filtrar anúncios</Modal.Header>
//                         <Modal.Body>
//                             <FormControl>
//                                 <FormControl.Label>Condição</FormControl.Label>
//                                 <Input ref={initialRef} />
//                             </FormControl>
//                             <FormControl mt="3">
//                                 <FormControl.Label>Email</FormControl.Label>
//                                 <Input />
//                             </FormControl>
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button.Group space={2}>
//                                 <Button variant="ghost" colorScheme="blueGray" onPress={() => {
//                                     setModalVisible(false);
//                                 } }>
//                                     Cancel
//                                 </Button>
//                                 <Button onPress={() => {
//                                     setModalVisible(false);
//                                 } }>
//                                     Save
//                                 </Button>
//                             </Button.Group>
//                         </Modal.Footer>
//                     </Modal.Content>
//                 </Modal><HStack space="4" justifyContent="center" alignItems="center">
//                         <Button onPress={() => {
//                             setModalVisible(!modalVisible);
//                         } }>
//                             Open Modal
//                         </Button>
//                         <Input w="32" ref={finalRef} placeholder="Enter the OTP" _light={{
//                             placeholderTextColor: "blueGray.700"
//                         }} _dark={{
//                             placeholderTextColor: "blueGray.100"
//                         }} />
//                     </HStack>
//                     </>

//     )
// }
    
