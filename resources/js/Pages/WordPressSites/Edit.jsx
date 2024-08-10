import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage, Link, Head } from '@inertiajs/react';

export default function Edit({ auth, className = '' }) {
  const { connected_ssh, error, site } = usePage().props;

    const { data, setData, patch, errors, processing, reset } = useForm({
        path: site.path
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('wordpress-sites.update', site.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit WordPress Directory {connected_ssh && (
              <span className="text-green-400"> (connected - {connected_ssh})</span>
          )}</h2>}
        >
            <Head title="WordPress Directories" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section className={className}>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit Existing Directory</h2>
                                <Link href={`/wordpress-sites`} className={`mx-1 px-3 py-1 border bg-blue-500 text-white float-right mb-2`}>Back</Link>
                            </header>

                            {error && (
                                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={submit} className="mt-6 space-y-12">
                                <div>
                                    <InputLabel htmlFor="path" value="Directory Path" />

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

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Update</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}