import { useCartStore } from '@microfrontend/shared';


type ProductCardProps = {
  id: number;
  image: string;
  name: string;
  weight: number;
  price: number;
};

export function ProductCard({ id, image, name, weight, price }: ProductCardProps) {

  const addProduct = useCartStore((state) => state.addProduct);


  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="flex h-full flex-col rounded-xl border-2 border-blue-900 bg-white p-8">
      <img src={image} alt={name} className="h-40 w-full object-contain" />

      <h3 className="mt-2 h-12 text-center text-base font-normal line-clamp-2">
        {name}
      </h3>

      <p className="text-center text-base">{weight}</p>

      <p className="text-center text-base font-medium">{priceFormatter.format(price)}</p>

      <button 
        className="mt-auto h-11 rounded-lg bg-blue-900 px-10 text-white"
        onClick={() => addProduct({
          id: id,
          title: name,
          price: price,
          quantity: 1,
          thumbnail: image,
          total: price
        })}
      >
        Adicionar
      </button>
    </div>
  );
}
