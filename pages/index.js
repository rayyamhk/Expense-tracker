import Button from '../src/components/atoms/Button';
import Card from '../src/components/atoms/Card';
import Typography from '../src/components/atoms/Typography';
import Progress from '../src/components/atoms/Progress';
import Radio from '../src/components/atoms/Radio';
import { useState } from 'react';
import TextField from '../src/components/atoms/TextField/index';
import Select from '../src/components/atoms/_Select';

export default function Home() {

  const [checked, setChecked] = useState('1');
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState(null);
  
  return (
    <div className="absolute inset-0 bg-surface center">
      <Select
        label="Select"
        className="mb-4 w-10"
        onSelect={(id) => setSelected(id)}
        selected={{ id: selected, value: `Very long long long long long long long long longlonglonglonglonglong text ...`}}
        options={[
          {id: '1', value: ' Value 1 Value 1 Value 1'},
          {id: '2', value: 'Value 2'},
          {id: '3', value: 'Value 3'},
          {id: '4', value: 'Value 4'},
          {id: '5', value: 'Value 5'},
          {id: '6', value: 'Value 6'},
          {id: '7', value: 'Value 7'},
        ]}
      />
      <TextField  id="id1" type="text" value={input} className="mb-4" onChange={(e) => setInput(e.target.value)} />
      <TextField id="id2" type="textarea" label="Textarea" value={input} row="3" onChange={(e) => setInput(e.target.value)} />
      <Radio id="id3"  onChange={() => setChecked('1')} checked={checked === '1'} label="TEST" value="1" />
      <Radio  id="id4" onChange={() => setChecked('2')} checked={checked === '2'} label="2" value="2" />
      <Progress value={70} max={100} variant="error" className="my-4" />
      <Card className="flex gap-x-2 bg-surface" elevation={2}>
        <Button size="sm" color="primary" variant="contained">This is a Button</Button>
        <Button size="md" color="primary" variant="contained">This is a Button</Button>
        <Button size="lg" color="primary" variant="contained">This is a Button</Button>
      </Card>
    </div>
  );
}
