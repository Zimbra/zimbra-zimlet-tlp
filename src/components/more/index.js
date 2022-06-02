import { createElement } from 'preact';
import { useContext, useCallback } from 'preact/hooks';
import { Text, IntlContext } from 'preact-i18n';
import { ActionMenuItem } from '@zimbra-client/components';
import { compose } from 'recompose';
import { withIntl } from '../../enhancers';
import TLPModal from './modal';
import { callWith } from '@zimbra-client/util';

function createMore(props, context) {
	const { intl } = useContext(IntlContext);
	const zimletStrings = intl.dictionary['zimbra-zimlet-tlp'];
	const showModalHandler = useCallback(() => {
		showModal(props, context, zimletStrings)
	}, [props, context, zimletStrings]);

	return (
		<ActionMenuItem onClick={showModalHandler}>
			<Text id='zimbra-zimlet-tlp.menuItem' />
		</ActionMenuItem>
	);
}

//implements closing of the dialog
function removeModal(context) {
	const { dispatch } = context.store;
	dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'tlpModal' }));
}

/* Method to display a toaster to the user */
function alert(context, message) {
	const { dispatch } = context.store;
	dispatch(context.zimletRedux.actions.notifications.notify({
		message: message
	}));
}

function showModal(props, context, zimletStrings) {
	const modal = (
		<TLPModal
			onClose={callWith(removeModal, context)}
			onAction={callWith(removeModal, context)}
			context={context}
			zimletStrings={zimletStrings}
			props={props}
		/>
	);
	const { dispatch } = context.store;
	dispatch(context.zimletRedux.actions.zimlets.addModal({ id: 'tlpModal', modal: modal }));
}

export default compose(withIntl())(createMore)
