interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function Card({ title, value, icon }: CardProps) {
  return (
    <div className="card">

      <div className="card-icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <p>{value}</p>

    </div>
  );
}

export default Card;