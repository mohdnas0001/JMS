'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const passwordSchema = zod.string().min(8, { message: 'Password should be at least 8 characters' })
  .regex(/[A-Z]/, { message: 'Password should contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password should contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password should contain at least one number' });

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: passwordSchema,
  confirmPassword: passwordSchema,
  phoneNumber: zod.string().min(1, { message: 'Phone number is required' }).refine(value => /^\d{10}$/.test(value), {
    message: 'Please enter a valid Nigerian phone number starting with +234 and followed by 10 digits'
  }),
  country: zod.string().min(1, { message: 'Country is required' }),
  state: zod.string().min(1, { message: 'State is required' }),
  lga: zod.string().min(1, { message: 'LGA is required' }),
  specialization: zod.string().min(1, { message: 'Specialization is required' }),
  affiliation: zod.string().min(1, { message: 'Affiliation is required' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type Values = zod.infer<typeof schema>;

const defaultValues = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phoneNumber: '', country: '', state: '', lga: '', terms: false } satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signUp(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }
      
      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, router, setError]
  );

  // Watching the values of country and state to enable/disable state and LGA fields
  
  const statesAndLGAs = {
    Abia: [
      "Aba North", "Aba South", "Arochukwu", "Bende", "Ikawuno", "Ikwuano",
      "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa",
      "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West",
      "Umuahia North", "Umuahia South", "Umu Nneochi"
    ],
    Adamawa: [
      "Demsa", "Fufore", "Ganye", "Girei", "Gombi", "Guyuk", "Hong",
      "Jada", "Lamurde", "Madagali", "Maiha", "Mayo Belwa", "Michika",
      "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo",
      "Yola North", "Yola South"
    ],
    AkwaIbom: [
      "Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", 
      "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", 
      "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", 
      "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", 
      "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Ukanafun", 
      "Udung-Uko", "Uruan", "Urue-Offong/Oruko", "Uyo"
    ],
    Anambra: [
      "Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", 
      "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", 
      "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", 
      "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", 
      "Orumba South", "Oyi"
    ],
    Bauchi: [
      "Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Ganjuwa", 
      "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", 
      "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"
    ],
    Bayelsa: [
      "Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", 
      "Southern Ijaw", "Yenagoa"
    ],
    Benue: [
      "Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", 
      "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", 
      "Makurdi", "Obi", "Ogbadibo", "Oju", "Okpokwu", "Ohimini", 
      "Otukpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"
    ],
    Borno: [
      "Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", 
      "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", 
      "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", 
      "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", 
      "Ngala", "Nganzai", "Shani"
    ],
    CrossRiver: [
      "Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", 
      "Boki", "Calabar Municipal", "Calabar South", "Etung", 
      "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", 
      "Yakuur", "Yala"
    ],
    Delta: [
      "Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", 
      "Ethiope West", "Ika North East", "Ika South", "Isoko North", 
      "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", 
      "Oshimili North", "Oshimili South", "Patani", "Sapele", 
      "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", 
      "Warri North", "Warri South", "Warri South West"
    ],
    Ebonyi: [
      "Abakaliki", "Afikpo North", "Afikpo South (Edda)", "Ebonyi", 
      "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", 
      "Izzi", "Ohaozara", "Ohaukwu", "Onicha"
    ],
    Edo: [
      "Akoko-Edo", "Egor", "Esan Central", "Esan North-East", 
      "Esan South-East", "Esan West", "Etsako Central", "Etsako East", 
      "Etsako West", "Igueben", "Ikpoba Okha", "Orhionmwon", 
      "Oredo", "Ovia North-East", "Ovia South-West", "Owan East", 
      "Owan West", "Uhunmwonde"
    ],
    Ekiti: [
      "Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", 
      "Ekiti West", "Emure", "Gbonyin", "Ido Osi", "Ijero", 
      "Ikere", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", 
      "Ise/Orun", "Moba", "Oye"
    ],
    Enugu: [
      "Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", 
      "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", 
      "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", 
      "Udenu", "Udi", "Uzo Uwani"
    ],
    FCT: [
      "Abaji", "Bwari", "Gwagwalada", "Kuje",
      "Kwali", "Municipal Area Council"
    ],
    Gombe: [
      "Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", 
      "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"
    ],
    Imo: [
      "Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", 
      "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", 
      "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", 
      "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", 
      "Okigwe", "Onuimo", "Orlu", "Orsu", "Oru East", "Oru West", 
      "Owerri Municipal", "Owerri North", "Owerri West"
    ],
    Jigawa: [
      "Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", 
      "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", 
      "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kaugama", 
      "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori", 
      "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"
    ],
    Kaduna: [
      "Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", 
      "Jema'a", "Kachia", "Kaduna North", "Kaduna South", 
      "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", 
      "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", 
      "Zaria"
    ],
    Kano: [
      "Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", 
      "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", 
      "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", 
      "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", 
      "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", 
      "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", 
      "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", 
      "Ungogo", "Warawa", "Wudil"
    ],
    Katsina: [
      "Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", 
      "Dandume", "Danja", "Dan Musa", "Daura", "Dutsi", "Dutsin Ma", 
      "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", 
      "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", 
      "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", 
      "Sabuwa", "Safana", "Sandamu", "Zango"
    ],
    Kebbi: [
      "Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", 
      "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", 
      "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", 
      "Yauri", "Zuru"
    ],
    Kogi: [
      "Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", 
      "Igalamela Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", 
      "Mopa Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", 
      "Omala", "Yagba East", "Yagba West"
    ],
    Kwara: [
      "Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", 
      "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", 
      "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"
    ],
    Lagos: [
      "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", 
      "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", 
      "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", 
      "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
    ],
    Nasarawa: [
      "Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", 
      "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"
    ],
    Niger: [
      "Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", 
      "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", 
      "Magama", "Mariga", "Mashegu", "Mokwa", "Muya", "Pailoro", 
      "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"
    ],
    Ogun: [
      "Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", 
      "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", 
      "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko-Afon", "Ipokia", 
      "Obafemi-Owode", "Odeda", "Odogbolu", "Ogun Waterside", 
      "Remo North", "Shagamu"
    ],
    Ondo: [
      "Akoko North-East", "Akoko North-West", "Akoko South-West", 
      "Akoko South-East", "Akure North", "Akure South", "Ese Odo", 
      "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", 
      "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"
    ],
    Osun: [
      "Atakunmosa East", "Atakunmosa West", "Aiyedaade", "Aiyedire", 
      "Boluwaduro", "Boripe", "Ede North", "Ede South", "Egbedore", 
      "Ejigbo", "Ife Central", "Ife East", "Ife North", "Ife South", 
      "Ifedayo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", 
      "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", 
      "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"
    ],
    Oyo: [
      "Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", 
      "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", 
      "Ibadan South-West", "Ibarapa Central", "Ibarapa East", 
      "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", 
      "Iwajowa", "Kajola", "Lagelu", "Ogo Oluwa", "Ogbomosho North", 
      "Ogbomosho South", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", 
      "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", 
      "Surulere"
    ],
    Plateau: [
      "Bokkos", "Barkin Ladi", "Bassa", "Jos East", "Jos North", 
      "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", 
      "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", 
      "Wase"
    ],
    Rivers: [
      "Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", 
      "Asari-Toru", "Bonny", "Degema", "Eleme", "Emohua", "Etche", 
      "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", 
      "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", 
      "Tai"
    ],
    Sokoto: [
      "Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", 
      "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", 
      "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", 
      "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"
    ],
    Taraba: [
      "Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", 
      "Jalingo", "Karim Lamido", "Kumi", "Lau", "Sardauna", "Takum", 
      "Ussa", "Wukari", "Yorro", "Zing"
    ],
    Yobe: [
      "Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", 
      "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", 
      "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"
    ],
    Zamfara: [
      "Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", 
      "Gummi", "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", 
      "Talata Mafara", "Chafe", "Zurmi"
    ]
  };

  const country = useWatch({ control, name: 'country' });
  const state = useWatch({ control, name: 'state' });
  const password = useWatch({ control, name: 'password' });

  const stateOptions = country === "Nigeria" ? Object.keys(statesAndLGAs) : [];
  const lgaOptions = state ? statesAndLGAs[state] || [] : [];

  const passwordValid = {
    length: password && password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password)
  };

  
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ color: 'black' }}>Register</Typography>
        <Typography variant="h6" sx={{ color: 'black' }}>Fill in all the necessary information</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2" sx={{ color: '#7c3b10' }}>
            Login here
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel sx={{ color: '' }}>First name</InputLabel>
                <OutlinedInput {...field} label="First name" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }} />
                {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.lastName)}>
                <InputLabel sx={{ color: '' }}>Last name</InputLabel>
                <OutlinedInput {...field} label="Last name" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }} />
                {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel sx={{ color: '' }}>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }} />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormControl error={Boolean(errors.phoneNumber)}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Select
                    value="+234"
                    onChange={(e) => { field.onChange(e.target.value) }}
                    label="Country code"
                    variant="outlined"
                    style={{ minWidth: 120 }}
                    sx={{ color: '' }}
                  >
                    <MenuItem value="+234">+234 (Nigeria)</MenuItem>
                    <MenuItem value="+1">+1 (US)</MenuItem>
                    <MenuItem value="+44">+44 (UK)</MenuItem>
                  </Select>
                  <OutlinedInput {...field} label="Phone number" style={{ flexGrow: 1 }} sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }} />
                </Stack>
                {errors.phoneNumber ? <FormHelperText>{errors.phoneNumber.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <FormControl error={Boolean(errors.country)}>
                <InputLabel sx={{ color: '' }}>Country</InputLabel>
                <Select {...field} label="Country" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }}>
                  <MenuItem value="Nigeria">Nigeria</MenuItem>
                </Select>
                {errors.country ? <FormHelperText>{errors.country.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <FormControl error={Boolean(errors.state)} disabled={!country}>
                <InputLabel sx={{ color: '' }}>State</InputLabel>
                <Select {...field} label="State" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }}>
                  {stateOptions.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
                {errors.state ? <FormHelperText>{errors.state.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="lga"
            render={({ field }) => (
              <FormControl error={Boolean(errors.lga)} disabled={!state}>
                <InputLabel sx={{ color: '' }}>LGA</InputLabel>
                <Select {...field} label="LGA" defaultValue="" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }}>
                  <MenuItem value="">
                    Select LGA
                  </MenuItem>
                  {lgaOptions.map((lga) => (
                    <MenuItem key={lga} value={lga}>
                      {lga}
                    </MenuItem>
                  ))}
                </Select>
                {errors.lga ? <FormHelperText>{errors.lga.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="specialization"
            render={({ field }) => (
              <FormControl error={Boolean(errors.specialization)}>
                <InputLabel sx={{ color: '' }}>Specialization</InputLabel>
                <Select {...field} label="Specialization" defaultValue="" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }}>
                  <MenuItem value="">
                    Select specialization
                  </MenuItem>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Chemistry">Chemistry</MenuItem>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Physics">Physics</MenuItem>
                </Select>
                {errors.specialization ? <FormHelperText>{errors.specialization.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="affiliation"
            render={({ field }) => (
              <FormControl error={Boolean(errors.affiliation)}>
                <InputLabel sx={{ color: '' }}>Affiliation</InputLabel>
                <OutlinedInput {...field} label="Affiliation" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }} />
                {errors.affiliation ? <FormHelperText>{errors.affiliation.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel sx={{ color: '' }}>Password</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }} />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                <FormHelperText>
                  <p>Password must contain at least:</p>
                  <ul>
                    <li className={passwordValid.length ? "text-green-500" : "text-red-500"}>
                      8 characters: {passwordValid.length ? '✓' : '✗'}
                    </li>
                    <li className={passwordValid.uppercase ? "text-green-500" : "text-red-500"}>
                      1 uppercase letter: {passwordValid.uppercase ? '✓' : '✗'}
                    </li>
                    <li className={passwordValid.lowercase ? "text-green-500" : "text-red-500"}>
                      1 lowercase letter: {passwordValid.lowercase ? '✓' : '✗'}
                    </li>
                    <li className={passwordValid.number ? "text-green-500" : "text-red-500"}>
                      1 number: {passwordValid.number ? '✓' : '✗'}
                    </li>
                  </ul>
                </FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)}>
                <InputLabel sx={{ color: '' }}>Confirm Password</InputLabel>
                <OutlinedInput {...field} label="Confirm Password" type="password" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '' } }} />
                {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the <Link sx={{ color: '#7c3b10' }}>terms and conditions</Link>
                    </React.Fragment>
                  }
                />
                {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
              </div>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained" sx={{ bgcolor: '#7c3b10', '&:hover': { bgcolor: '#5b2808' } }}>
            Register
          </Button>
        </Stack>
      </form>
      <Alert color="warning">Created users are not persisted</Alert>
    </Stack>
  );
}