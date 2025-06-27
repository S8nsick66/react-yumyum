export function MenuItemHeader({ name, price }: { name: string, price: number }) {
    return (
        <div className="flex justify-between text-header">
            <h2>{name}</h2>
            <div className="flex-grow menuItemBorder"></div>
            <div>{price} SEK</div>
        </div>
    );
}
