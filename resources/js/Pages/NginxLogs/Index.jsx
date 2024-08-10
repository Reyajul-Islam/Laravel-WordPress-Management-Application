import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { useForm, usePage, Link, Head, router } from '@inertiajs/react';

export default function Index({ auth, className = '' }) {
    const { message, error } = usePage().props;
    const { data, setData, post, errors, processing, reset } = useForm({
        path: "",
        timeframe: "",
    });

    const [output, setOutput] = useState([]);

    const submit = (e) => {
        e.preventDefault();
        post(route('nginx-logs.parse'), {
            onSuccess: ({ props }) => {
                setOutput(props.output);
            }
        });
    };

    useEffect(() => {
        if (message) {
            reset();
        }
    }, [message, reset]);

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Nginx Logs</h2>}
        >
            <Head title="Nginx Logs" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section className={className}>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Nginx Logs</h2>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-12">
                                <div>
                                    <InputLabel htmlFor="path" value="Nginx Path" />

                                    <TextInput
                                        id="path"
                                        className="mt-1 block w-full"
                                        value={data.path}
                                        onChange={(e) => setData('path', e.target.value)}
                                        required
                                        isFocused
                                    />

                                    <InputError className="mt-2" message={errors.path} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="timeframe" value="Timeframe(s)" />

                                    <TextInput
                                        id="timeframe"
                                        className="mt-1 block w-full"
                                        value={data.timeframe}
                                        onChange={(e) => setData('timeframe', e.target.value)}
                                        required
                                        isFocused
                                    />

                                    <InputError className="mt-2" message={errors.timeframe} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Check Log</PrimaryButton>
                                </div>
                            </form>

                            {output.length > 0 && (
                                <div>
                                    <h2>Parsed Log Data</h2>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>IP Address</th>
                                                <th>Request Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {output.map((entry, index) => (
                                                <tr key={index}>
                                                    <td>{entry.ip}</td>
                                                    <td>{entry.count}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};