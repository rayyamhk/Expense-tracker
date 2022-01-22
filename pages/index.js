import Button from '../src/components/atoms/Button';
import Card from '../src/components/atoms/Card';
import Typography from '../src/components/atoms/Typography';
import Progress from '../src/components/atoms/Progress';
import Radio from '../src/components/atoms/Radio';

export default function Home() {
  
  return (
    <div className="absolute inset-0 bg-surface center">
      <Typography variant="caption">This is a typography</Typography>
      <Radio label="Label" onChange={(e) => console.log(e.target.value)} value="Any" />
      <Progress value={70} max={100} variant="error" className="my-4" />
      <Card className="flex gap-x-2 bg-surface" elevation={2}>
        <Button size="sm" color="primary" variant="contained">This is a Button</Button>
        <Button size="md" color="primary" variant="contained">This is a Button</Button>
        <Button size="lg" color="primary" variant="contained">This is a Button</Button>
      </Card>
    </div>
  );
}
