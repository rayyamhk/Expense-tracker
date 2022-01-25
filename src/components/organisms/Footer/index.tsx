import Card from '../../atoms/Card';
import IconButton from '../../atoms/IconButton';

export default function Footer() {
  return (
    <Card
      as="footer"
      squared
      elevation={1}
      className="w-full bg-layout p-0 flex justify-evenly relative z-50"
    >
      <IconButton
        icon="home"
        size="xl"
        href="/app"
        variant="transparent"
        squared
        className="flex-1 shadow-none"
      />
      <IconButton
        icon="calendar_today"
        size="xl"
        href="/app/calendar"
        variant="transparent"
        squared
        className="flex-1 shadow-none"
      />
      <IconButton
        icon="add_box"
        size="xl"
        href="/app/transactions/create"
        variant="transparent"
        squared
        className="flex-1 shadow-none"
      />
      <IconButton
        icon="pie_chart"
        size="xl"
        href="/app/dashboard"
        variant="transparent"
        squared
        className="flex-1 shadow-none"
      />
      <IconButton
        icon="settings"
        size="xl"
        href="/app/settings"
        variant="transparent"
        squared
        className="flex-1 shadow-none"
      />
    </Card>
  );
};

