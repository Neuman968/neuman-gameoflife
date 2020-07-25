export const getSelectorFunc = (cellSelector) => {
   switch (cellSelector) {

       case 1:
       default:
           return singleSquareSelector
   }
}

const singleSquareSelector = (selectedIdx) => [selectedIdx]
