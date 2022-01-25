import Button from '../src/components/atoms/Button';
import Card from '../src/components/atoms/Card';
import Progress from '../src/components/atoms/Progress';
import Radio from '../src/components/molecules/Radio';
import { useState } from 'react';
import TextField from '../src/components/molecules/TextField';
import Select from '../src/components/molecules/Select';
import Calendar from '../src/components/organisms/Calendar';
import Clock from '../src/components/molecules/Clock';
import Switch from '../src/components/atoms/Switch/index';
import Layout from '../src/components/organisms/Layout';
import IconButton from '../src/components/atoms/IconButton';
import Footer from '../src/components/organisms/Footer';

export default function Home() {

  const [checked, setChecked] = useState('1');
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState(null);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [day, setDay] = useState(now.getDate());
  const [hour, setHour] = useState(now.getHours());
  const [minute, setMinute] = useState(now.getMinutes());
  const [switchChecked, setSwitchChecked] = useState(false);
  return (
    <div className="p-10 w-[600px] mx-auto flex flex-col items-center">
      <IconButton icon="home" size="xs"/>
      <IconButton icon="home" size="sm"/>
      <IconButton icon="home" size="md"/>
      <IconButton icon="home" size="lg"/>
      <IconButton icon="home" size="xl"/>
      <Switch checked={switchChecked} onChange={() => setSwitchChecked(!switchChecked)} />
      <Clock
        hour={hour}
        minute={minute}
        onTimeChange={(hour, min) => {
          setHour(hour);
          setMinute(min);
        }}
        className="w-[20rem]"
      />
      <Select
        className="mb-4 w-16"
        onSelect={(id) => setSelected(id)}
        error
        label="Example Select"
        selected={{ id: selected, value: `Very long long long long long long long long text ...`}}
        options={[
          {id: '1', value: ' Value 1 Value 1 Value 1', icon: 'close'},
          {id: '2', value: 'Value 2'},
          {id: '3', value: 'Value 3'},
          {id: '4', value: 'Value 4'},
          {id: '5', value: 'Value 5'},
          {id: '6', value: 'Value 6'},
          {id: '7', value: 'Value 7'},
        ]}
      />
      <Calendar
        year={year}
        month={month}
        day={day}
        today={[2022, 0, 25]}
        className="w-[15rem] h-[20rem]"
        onDateChange={(YYYY, MM, DD) => {
          setYear(YYYY);
          setMonth(MM);
          setDay(DD);
        }}
      />
      <TextField  id="id1" type="text" label="Input" value={input} className="mb-4" onChange={(e) => setInput(e.target.value)} />
      <TextField id="id2" type="textarea" label="Textarea" value={input} row="3" onChange={(e) => setInput(e.target.value)} />
      <Radio id="id3"  onChange={(value) => setChecked(value)} checked={checked === '1'} label="TEST" value="1" />
      <Radio  id="id4" onChange={(value) => setChecked(value)} checked={checked === '2'} label="2" value="2" />
      <Progress value={70} max={100} variant="error" className="my-4" />
      <Card className="flex gap-x-2 bg-surface" elevation={2}>
        <Button size="sm" color="primary" variant="contained">This is a Button</Button>
        <Button size="md" color="primary" variant="contained">This is a Button</Button>
        <Button size="lg" color="primary" variant="contained">This is a Button</Button>
      </Card>
      <Footer />
    </div>
  );
}
