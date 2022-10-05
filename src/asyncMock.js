const items = [
    {
        id: '1',
        name: 'Buzo Alpina Canguro Con Corderito Peluche Interno Unisex',
        price: '4.491',
        category: 'buzos',
        img:'https://http2.mlstatic.com/D_NQ_NP_964680-MLA50308334279_062022-O.webp',
        stock: 3,
        description: `Buzo Canguro Hoodie Campera con Corderito
        Marca: Alpina
        Fabricado en tela frizada
        Con interior de corderito (peluche) el cual lo hace mucho más abrigado
        Con Capucha
        Cordones ajustables
        Bolsillos delanteros`
    },
    {
        id: '2',
        name: 'Buzo Canguro Capucha Hoodie Campera Alpina Frizado',
        price: '3.290',
        category: 'buzos',
        img:'https://http2.mlstatic.com/D_NQ_NP_671033-MLA51575860065_092022-O.webp',
        stock: 15,
        description: `Buzo Canguro Hoodie
        Viene en dos versiones con 2 telas distintas, por fuera se ven exactamente igual, lo único que cambia es la tela.
        Para las épocas más frías y para los más friolentos el indicado es el frizado, lo seleccionan en el color, por ejemplo "NEGRO FRIZADO" y para primavera/verano el indicado es el RUSTICO, la diferencia es que la tela es más fina y liviana, para eso elijen el que dice "NEGRO RUSTICO"
        Marca: Alpina
        Fabricado en tela frizada o en tela de algodón rustico Premium
        Con Capucha
        Cordones ajustables
        Bolsillos delanteros
        Canchero y con excelentes terminaciones`
    },
    {
        id: '3',
        name: 'Zapatilla Original Puma Caven Adp Blanca Unisex',
        price: '18.999',
        category: 'zapatillas',
        img:'https://http2.mlstatic.com/D_NQ_NP_761199-MLA50783612817_072022-O.webp',
        stock: 20,
        description:`Siéntete cómodo, fresco, dinámico ya que gracias a su diseño y materiales te harán sentir y verte muy bien, con un estilo que podrás usar en toda ocasión, eso depende de ti y el cómo y cuando quieras usarlo, no te limites y disfrútalo \
        ¿CÓMO CUIDO MIS TENIS?
        Queremos que disfrutes de tu calzado PUMA durante el mayor tiempo posible. Los siguientes tips y consejos para cuidarlos te ayudarán a que se vean bien y se encuentren en buenas condiciones por un buen tiempo.
        Si tus tenis se mojan o ensucian, límpialos y sécalos lo más rápido posible para evitar daños a largo plazo.
        PUMA no recomienda lavar los tenis en la lavadora, independientemente del material del que estén hechos, ya que el pegamento y otros elementos pueden dañarse y esto puede hacer que no funcionen como se esperaba.`
    },
    {
        id: '4',
        name: 'Buzo C/cap New Balance Lifestyle Unisex Essentials Rosa Cli',
        price: '16.569',
        category: 'buzos',
        img:'https://http2.mlstatic.com/D_NQ_NP_855702-MLA51442342635_092022-O.webp',
        stock: 5,
        description:`El modelo Uni-ssentials French Terry Hoodie fusiona el estilo tradicional de New Balance con un diseño 100 % unisex. Este buzo con capucha está confeccionado en un tejido de rizo francés muy agradable y presenta un bolsillo frontal y una capucha con cordones, que le confieren un estilo informal con el máximo confort.
        -Material de rizo francés de algodón/poliéster de 280 g que emplea algodón procedente de BCI
        -Capucha con cordones planos de algodón
        -Puños, cuello y dobladillo acanalados
        -Bolsillo frontal
        -Bordado en dos tonos en el pecho izquierdo
        -Colección unisex diseñada para todo tipo de cuerpos
        Composición: 60% algodón, 40% poliéster`
    },
    {
        id: '5',
        name: 'Zapatilla Puma Original X-ray2 Square Better Unisex',
        price: '21.998',
        category: 'zapatillas',
        img:'https://http2.mlstatic.com/D_NQ_NP_725347-MLA50332740995_062022-O.webp',
        stock: 5,
        description:`HISTORIA DEL PRODUCTO

        Si buscas zapatillas a la moda con un impacto reducido en el planeta, no busques más.
        Este modelo toma algunos detalles del diseño de comienzos de la década del 2000 y nuestras siempre populares X-Ray.
        Están confeccionadas con un empeine con una mezcla de malla reciclada con revestimientos de gamuza y cuero sintético. Aparte, con una suela exterior de goma parcialmente reciclada.
        Incluyen una plantilla SoftFoam+ y una media suela de IMEVA moldeada por inyección. No solo disfrutarás de una amortiguación cómoda todo el día, sino que también reducirás tu huella de carbono.

        DETALLES:

        - Perfil bajo.
        - Logotipo PUMA n.º 2 en el panel lateral.
        - Logotipo PUMA n.º 1 en la etiqueta de la lengüeta.
        - Material reciclado: La parte superior de esta zapatilla está fabricada por lo menos con un 20% de materiales reciclados como un paso hacia un mejor futuro.
        `
    },
]


export const getItems = (categoryId) => {
    console.log(categoryId)
    if (categoryId == null || categoryId === undefined)
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(items)
            }, 2000)
        })
    }
    else{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    items.filter(item => {return item.category === categoryId})
                )
            }, 2000)
        })
    }
}

export const getItem = (itemId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(items.find(item => item.id === itemId ) )
        }, 2000)
    })
}